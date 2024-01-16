---
layout: post
title: "The UCI Protocol for Chess Engines"
date: January 15, 2024
author: Freddy
cover_img: "blog/chess-uci-protocol/thumbnail.webp"
summary: |
  Let's dive into the world of chess engines and how they communicate with sites
  like Lichess and Chess.com. We'll take an existing engine and implement a
  handler for a popular protocol called UCI. Finally, we'll briefly look at how
  to connect it to Lichess.
---


<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/chess-uci-protocol/" -%}
  {%- assign thibault_blog = "https://lichess.org/@/thibault/blog/how-to-create-a-lichess-bot/FuKyvDuB" -%}
  {%- assign mirroredbot = "https://lichess.org/@/MirroredBot" -%}
  {%- assign maia = "https://lichess.org/@/maia9" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>


<div class="callout callout-warning">
  Disclaimer: This article is more technical than my other articles.
</div>

Chess is a very popular board game. It has been around for centuries. These
days, you can use sites like [Lichess][lichess] or [Chess.com][chess.com]. Such
sites provide an **interface** for users to play chess.

[lichess]: https://lichess.org
[chess.com]: https://chess.com

There are also **chess engines** like Stockfish and Leela Chess Zero. Machine
learning techniques for chess AI are in active development and new engines are
being rolled out. To integrate these engines with the interfaces like LiChess,
there must be a method for 2-way communication. For example, the interface sends
the current board to the engine, then the engine sends back a move.

<img src="{{img_dir}}stockfish.png"
     alt="stockfish-logo" width="240px">

But that isn't all! There are other important information. The engine might want
to know how much time each player has, or whether someone has offered a draw.
The interface might want to know whether the engine is ready to receive a new
position, or whether it is still calculating.

In order for different interfaces and different engines to communicate
seamelessly, we need to define a set of rules, or a **protocol**. We will look
at one of the most popular protocols: UCI.

## The need for UCI

One of the earliest user interfaces for chess that supported engines is
XBoard (a.k.a. WinBoard), developed by Tim Mann in 1991.

<img src="{{img_dir}}xboard.png"
     alt="xboard-4.4.0" width="420px" class="img-thumbnail">

XBoard uses the **Chess Engine Communication Protocol** (CECP), which was
sufficient in those days. However, as chess engines became stronger and
stronger, they soon were able to play multiple games at once. CECP is a stated
protocol, which means the engine state depends on previous commands. Context
switching between multiple games is possible but chaotic.

In 2000, Stefan Meyer-Kahlen, the author of multi-time World Computer Chess
champion Shredder, proposed a new protocol alongside Rudolf Huber: the
**Universal Chess Interface** (UCI). This is a stateless protocol which
addresses the limitations of CECP. It allows communication via standard
input/output text-based messages and long algebraic notation.

<img src="{{img_dir}}shredder.jpg"
     alt="shredder-chess-interface" class="img-thumbnail">

## Example: Implementing UCI in Python

The current specification is available to download from the [Shredder][uci-spec]
site (under *Download UCI Chess Engine Protocol*).

[uci-spec]: https://www.shredderchess.com/download.html

Let's implement a bare-bones UCI handler from the engine's perspective.

Assume we have written an AI class with a method `choose_move` that takes in the
board state. We'll use the [python-chess][python-chess] library for game logic.

[python-chess]: https://python-chess.readthedocs.io/en/latest/

Essentially, we need a listener for commands from the interface. Since the
pipeline is the standard input/output, we can simply use an infinite `while`
loop. We will later see that we can handle the `quit` command by calling
`sys.exit()`.

```py
import chess

if __name__=="__main__":
    board = chess.Board()
    # Assume we have already written an AI class
    ai = AI()

    while True:
        service_uci_command(
            command=input().strip(),
            board=board,
            ai=ai,
        )
```

Cool! Now, we need to write the `service_uci_command` function to service each
of the various commands.

If you've downloaded the UCI spec, you'll see a bunch of commands that the
interface can send to the engine, like `uci`, `isready`, `position [fen  |
startpos ]  moves  ....` etc. An easy way to process them is to split each
command into a list of words, treating each word as a token.

```py
def service_uci_command(command: str, board: chess.Board, ai: AI):
    tokens = command.split()
```

Python 3.10 introduced `match` expressions, so let's try that for readability
instead of `if/else` statements.

We start off with the simple commands.

```py
import sys

def service_uci_command(command: str, board: chess.Board, ai: Player):
    tokens = command.split()

    # First word of command
    match tokens[0]:
        # The spec states the engine must print these 3 lines
        case "uci":
            print("id name NameOfBot")
            print("id author FirstName LastName")
            print("uciok")

        # The spec states the engine must print this line
        case "isready":
            print("readyok")

        case "ucinewgame":
            board.reset()
        
        case "quit":
            sys.exit()
```

The `go` command has a lot of information, including the time left, increment
and other metadata. For a bare-bones implementation, we can ignore them and just
invoke the AI to calculate the next move.

```py
        case "go":
            move = ai.choose_move(board.fen())
            print(f"bestmove {move}")
```

Finally, there's one last command that we must handle: `position`. This allows
the interface to tell the engine the current board state. There are 2 options:
1. `position fen <fen> moves ....`
2. `position startpos moves ....`

Either way, the interface can send a list of moves, so we need to process that.
```py
for move in tokens_moves:
    board.push_uci(move)
```

The only difference is that `fen` consists of a FEN string (6 words) following
the flag, while `startpos` trivially has no FEN string. Therefore, we must set
`tokens_move` accordingly. Here's the full code:

```py
        case "position":
            match tokens[1]:
                case "fen":
                    # FEN has 6 words
                    fen = "".join(tokens[2:8])
                    board.set_fen(fen)
                    tokens_moves = tokens[9:]
                case "startpos":
                    board.reset()
                    tokens_moves = tokens[3:]
                case _:
                    raise ValueError("Invalid position command")

            for move in tokens_moves:
                board.push_uci(move)
```

We can ignore all other commands for now, as they are not compulsory.

For a full example, see
[https://github.com/j-freddy/chess-ai/blob/master/uci.py](https://github.com/j-freddy/chess-ai/blob/master/uci.py)

## Hooking the engine with LiChess

Lichess is a popular, open-source chess interface. Let's configure it to host
our engine by forking the official Python [bridge][bridge] between API and
engines. The [source code][bot-source] for the engine itself is also available.

[bridge]: https://github.com/j-freddy/lichess-bot
[bot-source]: https://github.com/j-freddy/chess-ai


<div class="callout callout-warning">
  This article will <b>not</b> teach you how to set up a Lichess bot. To do
  that, read <a href="{{thibault_blog}}">Thibault's post</a>. The documentation is
  very well maintained, so you are in good hands if you are a developer.
</div>

The bridge supports binary `.exe` engines that implement UCI. We can use
PyInstaller to convert our Python repo into a standalone `.exe` file:

```sh
pyinstaller -F uci.py
```

Following the [documentation instructions][doc-instr], we copy the `.exe` file to `engines/`
in the bridge repo and update `config.yml` accordingly. In particular, we have
to comment out the `uci_options` configurations, since we skipped over them in
our bare-bones UCI implementation.

[doc-instr]: https://github.com/lichess-bot-devs/lichess-bot/wiki/Create-a-custom-engine

Finally, run the bridge:

```py
python lichess-bot.py -v
```

<div class="callout callout-info">
  Here's my bot on LiChess: <a href="{{mirroredbot}}">MirroredBot</a>. It's
  probably offline, but it has played a few games.<br /><br />

  I've only ever hosted it locally. That's why it's offline most of the time.
  Some bots, like <a href="{{maia}}">Maia</a>, are always online. How can we do
  that?<br /><br />

  In today's world of cloud computing and microservices, we can rent a server
  and host our bot from there. Essentially, this just means renting a computer
  device in some data centre (e.g. one affiliated with Amazon Web Services),
  accessing it remotely, cloning and setting up the bridge like we've done
  before and running <b><i>python lichess-bot.py -v</i></b>.<br /><br />

  <img src="{{img_dir}}data-centre.jpg"
     alt="aws-data-centre">
</div>

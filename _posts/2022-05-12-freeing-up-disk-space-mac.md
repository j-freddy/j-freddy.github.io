---
layout: post
title: "Freeing Up Disk Space on Mac (DIY)"
date: May 12, 2022
author: Freddy
published: false
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/freeing-up-disk-space-mac/" -%}
</div>

<span id="blog-summary">
Running out of disk space? Storage on Mac OS X gets used up quickly and
mysteriously. This article is a comprehensive guide to freeing up disk space
without using tools like CleanMyMac. In the process of doing so, we'll also
discover exactly where all our big folders are. As a disclaimer, this article is
written with respect to Mac OS X Catalina, but is applicable to other Mac
operating systems.
</span>

We'll start off with some surface checks.

Click the Apple icon on the top left, then click `About This Mac`. Click on
`Storage`.

<img src="{{img_dir}}storage-categorisation.png"
     alt="storage-categorisation" width="640px" class="img-thumbnail">

Chances are the dark grey bar is quite long. If you hover over it, this bar
represents files categorised as `Other`. The latter of this article will be
primarily on this section. For now, click `Manage...`.

On the sidebar, the other 2 large categories should be `Applications` and
`Documents`. If we click on `Applications`, we have our list of applications,
sorted by size. You can also force the list to be ordered by size by clicking on
it.

<img src="{{img_dir}}applications.png"
     alt="applications-list" width="640px" class="img-thumbnail">

Note that the displayed size is the raw size of the app, not including any
metadata and caches. If you delete an unused app here, you can also manually
delete its associated caches to free up more space (which we'll look at later).

Let's move on to `Documents`. Here, you can view and delete unnecessary large
files and unsupported apps. Under `Downloads`, you can also delete large zip
files and installer dmg files.

If you have long HD videos, they'll appear near the top. Videos are one of the
largest types of files, because they're essentially thousands of images! No
compression algorithm can shrink videos to sizes comparable to images. On
Windows, you have the option to store them on the `D: Drive`, but on Mac, we
don't have one. Maybe it's time to consider Cloud storage like Google Drive? 

The more interesting category is the `File Browser`. Here, you may find a
Library folder that is quite large.

<img src="{{img_dir}}file-browser.png"
     alt="file-browser" width="640px" class="img-thumbnail">

Inside it, there are 2 main folders of interest. Let's first look at `Caches`.
This is temporary data used to speed up applications. If you uninstall an
application, the cache becomes useless, so we can also delete that. As an
example, the entire Chrome folder can be deleted if Google Chrome
is uninstalled.

<img src="{{img_dir}}file-browser-cache.png"
     alt="cache" width="640px" class="img-thumbnail">

In fact, you can safely delete the entire Caches folder! This is what some junk
cleaning apps do. But, you **should not** do that, and there are 2 reasons.

1. As mentioned, cache is used to speed up applications. If you delete cache,
your applications run slower (until the cache is built up again, so it goes back
to normal soon).
2. When the cache is built up again, it uses storage space. This means you will
only be freeing storage temporarily, so it's redundant in the long run.
Therefore, it's only useful to delete cache for uninstalled applications.

Some cache folders have seemingly obscure names, like `com.spotify.client`. But,
these are no different, and you can safely delete it if you uninstall Spotify,
for example.

The other folder is `Application Support`. This contains metadata and even more
cache. You can also delete the respective folder for uninstalled apps.

<img src="{{img_dir}}file-browser-application-support.png"
     alt="application-support" width="640px" class="img-thumbnail">

What about these categories?

<img src="{{img_dir}}file-browser-other.png"
     alt="system-and-other" width="180px" class="img-thumbnail">

`System` is the operating system. It's large. It's mandatory. But, what about
`Other`?

## Exploring the Other category

This is where the danger zone begins. Modifying or deleting the wrong parts can
cause some functionality to break. That said, Mac will prevent you from modifying
or deleting the *really* important files. Let's proceed with caution.

Open a Finder window and press `CMD` + `SHIFT` + `G`. In the popup, type `/`.

<img src="{{img_dir}}go-to-root.png"
     alt="going-to-root" width="640px" class="img-thumbnail">

You should now be here. This is the root directory. Every folder or file on your
computer can be accessed from here. For example, you can reach the desktop via
`Users > your_username > Desktop`. Our big friend Library is here as well.

Now press `CMD` + `SHIFT` + `.`.

<img src="{{img_dir}}root-all.png"
     alt="root-with-hidden-files" width="640px" class="img-thumbnail">

This reveals hidden folders and hidden files. These files are hidden by default,
as they're usually system files that the user does not need to interact with.
You can explore inside these hidden folders without harm.

## How big are the hidden folders?

Short answer: really big. Mac labels these folders as `Other`, and they make up
a big chunk of it.

The simplest way to explore the folders through the command line. Press `CMD` +
`SPACE` and open Terminal. Type the following command, and hit enter. (Note:
by convention, we'll prepend each command with a `$`. The actual command you
type is `cd /`.)
```
$ cd /
```

We're back at Root, this time via the command line. Let's look at the folders in
Root again.
```
$ ls

Applications Preboot      Users        bin          dev          home         private      tmp          var
Library      System       Volumes      cores        etc          opt          sbin         usr
```

The next command will scan the entire computer and list the largest folders and
files.

Before I present the command, let's talk about it. We're going to exclude System
from our scan, since there's a loop: `System > Volumes > Macintosh HD` and we're
back at Root. Now, if we were to run the scan, Mac is smart enough to figure
this out, and will only scan the entire computer twice instead of infinitely.
However, this is still redundant.

The only other interesting folder in System is Library. This is **not** the
Library folder we previously looked at. This is the System Library. You can
select it in Finder and press `CMD + i`. Yup, it's also pretty big.

<img src="{{img_dir}}system-library.png"
     alt="system-library" width="360px" class="img-thumbnail">

Inside it, you can find large folders, like `Desktop Pictures` which is 2GB in
size. It's just a bunch of photos, but they're in such high definition that they
use up a lot of space! Oh well, nothing we can do.

Back to the command. Before running it, you can expect a **lot** of "Operations
not permitted" messages. This is a good thing! These are files/folders that are
so important that Mac is disabling you from trying to scan them.

Finally, the full scan will take a long time (give at least 20 minutes). You can
tell your computer is making progress when the lovely "Operations not permitted"
messages continue to pop up. Alright, here it is.

```
$ du -I System -d 3 | sort -n
```

<!--
  - PART TWO
    - CMD + SPACE -> Terminal
    - $ cd /
    - $ ls
    - We're here at Root again, this time in the Terminal.
    - Now, we're going to find the largest folders here.
    - But, we exclude System as there's a bit of a loop there -> in System,
    we find Macintosh HD again! And Applications again!
    - Also, we'll limit the Terminal to display files/folders at depth 3 (i.e.
    3 folders deep from root). But don't worry! The numbers still add up to
    everything!

    - Before running this - what to expect
      - A crap ton of "Operations not permitted"
      - That's a good thing! These are files/folders which are very important,
      so Mac is automatically disabling you from trying to scan them.
      - prepare a cup of coffee. This will take a long time. (a good 20 minutes,
      but could even take an hour, depending on how much disk space you've used.
      It's a complete scan of your entire computer, so it'll take a long time.)
      - You can tell you're making progress when those lovely "Operations not
      permitted" messages pop up.
    - $ du -I System -d 3 | sort -n

    - These stats are in KiloBytes.
    - Big stuff
      - usr
      - private
      - ./private/var/vm (This is our Virtual Machine!!! Don't touch!!!)
      - usr/local/Cellar -> Homebrew
      - usr/local/share -> mostly dotnet (C#). Safe to remove.
    - Where to go from here?
      - cd "path/to/big/folder"
      - run $ du -d 3 | sort -n
      - delete unnecessarily big files
    - What's beautiful about using the Terminal is that you are given so much
    more information now, i.e. all hidden files, usr programs, binary programs,
    etc. but with this exposure, you need to be more cautions and not delete
    something unless you are SURE it is safe to delete it.
    - I like to call this a Scavenger Hunt as you are hunting for large, safe
    files to delete.
-->

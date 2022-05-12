---
layout: post
title: "Freeing Up Disk Space (Mac): A DIY Comprehensive Guide"
date: May 12, 2022
author: Freddy
---

<div class="blog-preamble">
  <!-- {%- assign img_dir = "assets/img/blog/programming-bezier-curves/" -%} -->
</div>

<span id="blog-summary">
</span>

<!--
  - PART ONE
  - Firstly, we'll do some surface checks. This part will take around 5 minutes.
  Don't worry if you've already tried this to no avail! The next section is the
  main fix. But, if this first solution works, then you're all set :)

  - Apple icon -> Storage
    - Other storage is massive
  - Click "Manage"
    - Applications -> Size
    - Documents -> Large Files
      - Videos
      - videos (why? basically a load of images, so very large even w/
      compression)
    - File Browser
      - Library big? (e.g. 20 GB)
      - You can't do much. Most of it is "cache". (i.e. Caches, Application
      Support) Basically saved data to increase performance. You can safely
      delete the folders to free up temporary space, but they will accumulate
      back. There are better ways of freeing space, which we will explore soon.
      - This is a good time to rant about applications, such as CleanMyMac
      - "removes unneeded junk"
      - This is almost all cache. Removing it is temporary and completely
      useless in the long run. It's a glorified app for non-techies, but in
      reality, it's unnecessary.
  - System is the Operating System. It's large. It's mandatory.

  - PART TWO
  - Other?
    - CMD + SHIFT + G then go to /
      - this is Root. Everything on your entire computer can be found from here.
      - our big friend Library folder is here as well :)
      - Danger zone - proceed with caution.
      - CMD + SHIFT + . reveals hidden files.
        - Would your computer explode if you delete them, modify them, etc.?
          - No. Well, some of them may be important for some functionalities.
          But, you can visit these folders and view them, and it's all fine if
          you don't touch them.
          - In fact, we'll look to delete some of these hidden files.
      - see the "usr" folder? It's probably very big.
      - But, how big are the folders, really?
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

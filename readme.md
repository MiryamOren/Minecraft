Minecraft Project

HTML
  - landing page
    - header
    - btn
  - maine page
    - game board
    - nav bar
      - tools
      - tile inventory

JS
  - initialize the game board
    - set (randomly) the amount, the size and the position on the board
      of the elements (ground, trees, rocks, clouds)
    - create matrix of n*n divs and store them in arr
    - while creating, add event listner to each div.
    - Go over the matrix and add a class of the relevant tile
      to the divs according to the element they represent 

  - game - initialize
    - create global vars:
      - current tool / tile
      - current available tiles = 0;
    - create Obj tools and tiles:
      - same class
      - property add(tile) / remove(tool)  
      - property tile (tree / rock / ground)
    - create arr of the tools, add event listener to each and display them on screen
    - create function addTile - get tile,
      add it to current available tiles, add event listener to it and display it on screen
    - create function removeTile - get tile,
      remove it from current available tiles and from screen

  - game - events
    - tool picking
      - change current tool / tile to this tool
    - tile picking
      - change current tool / tile to this tool
    - click on board panel
      - get the panel index
      - get the panel class
      - check current tool / tile
      - if tool:
          if panel class === tool tile:
            remove panel class & call addTile(tile).
          else: the tool icon background change to red
      - if tile:
          if panel have no class:
            panel class = tile & call removeTile & current tool / tile = none
          else:
            the tile icon border change to red



          
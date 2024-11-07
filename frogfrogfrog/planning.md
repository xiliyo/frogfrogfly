# Planning

## Starting point

The initial idea:

> Frog eating flies
> Adding instructions and a shop to gameify it more.

## Experience design

The experience:

> The user controls a frog at the bottom of the screen, they can shoot out the frog's tongue and catch a fly which is moving on the screen. If the tongue hits the fly it gets eaten.

## Breaking it down

Basic things to do:

- Draw the frog (image? a circle?)
- Draw the tongue...
- Move the frog by clicking.
- Move the fly in a straight line with varying velocities.
- Make the fly spawn with vary speeds, sizes, and colours corresponding to it's colour.
- Figure out if the tongue hits the fly?
- Add a score.
- Add a state for a shop menu.
- Add a state for instructions menu.

Questions:

- What does the frog look like?
    - Circles!

- How does the user control the frog?

    - User controls frog with the mouse position, just to the left and right
    
    - User launches the tongue with a mouse click

- How does the fly work?

    - The fly starts on the left at a random y position, and moves to the right in a line

    - Different coloured flies that give play power ups (making tongue move faster) / power downs.
        - Blue flies that make the tongue move faster because it’s the frog’s favourite snack lol.
        - Purple flies that make the tongue slow.
        - Horrible brown fly that deducts points.

    - There will be randomly sized flies that give players different scores
    - The flies will also have a random movement speed

- What does the tongue look like?
    - A red line coming out of the frog...

- What happens if the user doesn't catch the fly?
    - If the fly goes off the right side, it just resets to a new random y on the left

- What does it all look like on the screen? Layout?
    - Frog at the bottom, fly moving across, tongue shooting out of frog

## The program starts to form....

What is there?

- The frog
    - Position and size
    - Position and size of tongue
    - What is the tongue doing?
- The fly
    - Position and the size
    - Colour
    - Velocity

```
frog
    body
        x
        y
        size
    tongue
        x
        y
        size
        speed
        state

fly
    x
    y
    size
    speed
```

shop 
    score (for purchases)
    items (to up your score, like cookie clicker)


What happens in this project?

- Start (setup)
    - Create a canvas
    
- Every frame (draw)
    - Draw the background
    - Move and draw the fly
        - Add the fly's speed to it x
        - Draw a circle at the fly's position with its size (black)
    - Move and draw the frog
        - Move the frog to the mouse's x position
        - Draw a green circle at the frog's position with its size
    - Move and draw the tongue
        - Move the tongue
            - If the tongue isn't launched, just do nothing... don't draw it
            - If the tongue is launched, move it up (by its speed)
            - If the tongue is coming back, move it down (by its speed)
            - If the tongue hits the top, send it back down
            - If the tongue gets back to the frog, then stop it
        - Draw the tongue
            - Draw a line from the frog to the tongue position
            - Draw a circle at the end of the tongue
    - Check if the tongue hit the fly
        - Check if tongue circle and fly circle overlap
        - If they do, then reset the fly
        - If they don't.... nothing... just keep being a tongue
    - Draw the shop button

Events

- If the user clicks the mouse
    - If the tongue is still inside the frog's mouth
        - Launch the tongue
            - If fly is caught
                - Add to score

- If the user clicks the shop button
    - Open shop state/ window displaying all items available
        - If user clicks and item and has enough score
           -   
https://patdavid.net/2014/02/25d-parallax-animated-photo-tutorial.html

In GIMP:
1. create a copy of the image and name each as a layer - base layer, background layer and however many foreground layers you want

2. view onliy foreground layer. In foreground layer, add layer mask. This means you can delete background by painting in black.
3. export this foreground layer as a .png using File > Export, add filename, click 'Export' and then make sure that 'save colour values from transparent pixels' is checked before clicking 'Export' again.
4. Now remove the foreground from the background layer. 
    a. right click on the foreground layer and click 'Mask to selection'
    b. turn on visibility of background layer only
    c. Select > Grow and grow by 1-4 px, Select > sharpen
    d. Select red and fill in selection
    e Filters > GMIC'Qt (install plugin if not present) and use either Inpaint multi-scale or Inpaint patch-based (whichever gets best effect) checkng the hex code of the colour red matches the colour you've coloured in on the picture.
    f. use the clone tool to tidy up if needed
    g. export as png
    
In Blender:
1. Check that Import Images as Planes addon is anabled by clicking on the symbol top left of a grid and a sphere > Preferences > Add-ons > search for images then switch back to 3D viewpoint
2. Delete cube and lamp by selecting (shift + r click) and deleting (x key)
3. File > Import images as planes > select both files, uncheck 'Offset planes' and select Orientation > Up, select Material Settings > Shadless
4. Click 'Viewport shading' (circle with shading top right corner)
5. Click on the camera. You may need to set camera to transformations and values to 0. If the images aren't over 0 as well do the same for these objects.
6. Now progressively change the Z location so the camera view covers more than the images.
7. Add light if necessary
8. Select background, press G then Z then move mouse to move background back.
9. Stoll with background selected kit S and move the mouse to scale the background to aroun the same size as before
8. Save as png - Press F12 to render > Image > Save as 

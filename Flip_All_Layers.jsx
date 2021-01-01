//Script to flip all layers horizontally
//Just collect all layers in an array and then flip each one by looping
//if background layer is present it has to be transformed into a normal layer, then flipped, and then turned back into a
//Not really recomended for multiple frame animations.

//get the document
doc = app.activeDocument;

//get the array with all the layers
allLayers = [];
allLayers = collectAllLayers(doc, allLayers);

//loop and flip
for (var i = 0; i < allLayers.length; i++) {
    //flip all layers that aren't backgorund
    if (allLayers[i].isBackgroundLayer == false) {
        
        var vis = allLayers[i].visible;                                         //save whether the layer was visible or not

        allLayers[i].visible = true;                                            //set to visible so the layer is editable
        allLayers[i].resize(-100, undefined, AnchorPosition.MIDDLECENTER);      //flip the layer
        allLayers[i].visible = vis;                                             //set the visibility back to what it was before editing
    }

    else {
    //flip the backgorund layer (if existant)
        allLayers[i].visible = true;                                            //set to visible so the layer is editable
        allLayers[i].isBackgroundLayer = false;                                 //transform background layer into normal layer
        allLayers[i].resize(-100, undefined, AnchorPosition.MIDDLECENTER);      //flip it
        allLayers[i].isBackgroundLayer = true;                                  //turn back into backgorund layer
        allLayers[i].visible = vis;                                             //set the visibility back to what it was before editing
    }
}

function collectAllLayers (doc, allLayers){
    //returns array containing all posible layers.
    for (var m = 0; m < doc.layers.length; m++){
        var theLayer = doc.layers[m];
        if (theLayer.typename === "ArtLayer"){
            allLayers.push(theLayer);
        }else{
            collectAllLayers(theLayer, allLayers);
        }
    }
    return allLayers;
}
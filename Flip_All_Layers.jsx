//Script to flip all layers horizontally
//Just collect all layers in an array and then flip each one by looping
//if background layer is present it has to be transformed into a normal layer, then flipped, and then turned back into a

//get the document
doc = app.activeDocument;

//get the array with all the layers
allLayers = [];
allLayers = collectAllLayers(doc, allLayers);

//loop and flip
for (var i = 0; i < allLayers.length; i++) {
    if (allLayers[i].isBackgroundLayer == false) { //flip all layers that aren't backgorund
        allLayers[i].resize(-100,undefined);
    }
    else {
        allLayers[i].isBackgroundLayer = false; //transform background layer into normal layer
        allLayers[i].resize(-100,undefined); //flip it
        allLayers[i].isBackgroundLayer = true; //turn back into backgorund layer
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
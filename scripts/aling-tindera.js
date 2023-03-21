let rates = {
    softplastics:2,
    petclear:15,
    petmixed:10,
    petcolored:2,
    tarp:2,
    syrene:2,
    hdpe:2,
    tetra:2
};


function processCal(matType)
{
    var total;
    let quantityTxt = document.getElementById("quantity");
    let totalTxt = document.getElementById("total");
    let totalString = "";

    if (quantityTxt.value <= 0) {
        totalString = "0";
    }else{
        total = rates[matType] * parseInt(quantityTxt.value);
        totalString = total.toString();
    }

    
    totalTxt.value = "₱" + totalString;
}

function calculateKita()
{
    let typeTxt = document.getElementById("item-type").value;
    processCal(typeTxt);
    
}
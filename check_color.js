export default function checkClr(exp) {
    let clr;
    switch (exp) {
        case "bug":
          clr = "linear-gradient(125deg, #729f3f 20%, #729f3f 50%);"
          break;
        case "dragon":
          clr = "linear-gradient(125deg, #53a4cf 20%, #f16e57 50%);"
          break;
        case "fairy":
          clr = "#fdb9e9;"
          break;
        case "fire":
          clr = "#fd7d24;"
          break;
        case "ghost":
          clr = "#7b62a3;"
          break;
        case "ground":
          clr = "linear-gradient(125deg, #f7de3f 20%, #ab9842 50%);"
        break;
        case "psychic":
          clr = "#f366b9;"
          break;
        case "steel":
          clr = "#9eb7b8;"
          break;
        case "dark":
          clr = "#707070;"
          break;
        case "electric":
          clr = "#eed535;"
        break;
        case "fighting":
          clr = "#d56723;"
        break;
        case "flying":
          clr = "linear-gradient(125deg, #3dc7ef 20%, #bdb9b8 50%);"
          break;
        case "grass":
          clr ="#9bcc50;"
          break;
        case "ice":
          clr = "#51c4e7;"
          break;
        case "poison":
          clr = "#b97fc9;"
        break;
        case "rock":
          clr = "#a38c21;"
        break;
        case "water":
          clr = "#4592c4;"
        break;
        default: //normal
          clr = "#a4acaf;"
          break;
    } 
    return clr;
}
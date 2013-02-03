//array that contains HTML buttons
var buttons = new Array(9);

function createArray() {
var canvas = new Array(9);
for (i=0;i<buttons.length;i++) {

  buttons[i] = '<input type="button" class="game_button" value='+i+' name="b'+i+'" onclick="handleClick(this)"> </input>';
}

i = 8;
buttons[i] = '<input type="button" class="game_button" id="E" name="b'+i+'" onclick="handleClick(this)"> </input>';
printArray();
}

//event handler
function handleClick(obj) {
  //return index of the clicked button
  var index = getButtonIndex(obj.name);
  var candidates = getAllNeighbors( index ); //get neighbors
  var emptyIndex = hasEmptyBox(candidates);
  //if the empty box is a neighbor, swap seats with it
  if (emptyIndex != -1) {

    swap(index, emptyIndex);

    can = document.getElementById("canvas");
    can.innerHTML="";
    printArray();
  }
  else {
	
}
  var finished;
  if(isEmpty(buttons[8]) !=-1 ) {
    for(i=0;i<=7;i++) {
      finished = false;
      var cur = getButtonIndex(i);
      if(buttons[i].indexOf(i) !=-1 ) {

	finished = true;
      } else {

	finished = false;
	break;
      }

    }

   if( finished == true ) {
     alert("Congratulations, you have solved the puzzle");
  }

  }



}

//Decides if the empty box is nearby
function hasEmptyBox(candidates) {

  for(i=0;i<candidates.length;i++) {

    if( buttons[candidates[i]].indexOf("id=\"E\"") != -1 ) {

      return candidates[i];
    }


}
return -1;
}

//At which position is the button?
function getButtonIndex(name) {
  var n = name[1];
  name = n;

  if( n == null ) {
    n = "value=E";
  }
  var x;
  for(j=0;j<buttons.length;j++) {


    if( buttons[j].indexOf(n) !=-1) {

      x = j;
    }
  }

  return x;
}

//initial shuffling. Swaps iteratively empty box with random neighbor
function shuffle() {

  var rndNeighbor;
  var currCell = 8;
  for(i=0;i<1000;i++) {
   //get neighbors
   var candidates = getAllNeighbors( currCell );
   var rndNeighbor = Math.floor(( Math.random()*candidates.length ));
   //choose random neighbor
   var choice = candidates[rndNeighbor];
   swap( currCell, choice );
   currCell = choice;
   rndNeighbor = Math.floor(( Math.random()*candidates.length ));
  }

}



function swap( currCell, choice ) {


  var temp = buttons[choice];
  buttons[choice] = buttons[currCell];
  buttons[currCell] = temp;
  
}




//Returns neighbors according to index
function getAllNeighbors( i ) {

  var res = new Array();
  if (i==0) {
    res[0] = 1;
    res[1] = 3;
  } else if (i==1) {

    res[0] = 0;
    res[1] = 2;
	res[2] = 4;
  } else if (i==2) {

    res[0] = 1;
    res[1] = 5;
  } else if (i==3) {

    res[0] = 0;
    res[1] = 4;
	res[2] = 6;

  } else if (i==4) {

    res[0] = 1;
    res[1] = 3;
    res[2] = 5;
    res[3] = 7;
  } else if (i==5) {

    res[0] = 2;
    res[1] = 8;
    res[2] = 4;
  } else if (i==6) {

    res[0] = 3;
    res[1] = 7;
  } else if (i==7) {

    res[0] = 4;
    res[1] = 6;
    res[2] = 8;
  } else if (i==8) {

    res[0] = 5;
    res[1] = 7;
  }

  return res;
}



function printArray() {
  var can = document.getElementById('canvas');
  can.innerHTML = "";
  for (i=0;i<buttons.length;i++){
   can.innerHTML+=buttons[i];
   if (((i+1)%3)==0) {
     can.innerHTML +="<br>";
  }
 }
}

function isEmpty(btn) {

  return btn.indexOf("b8");
}

function main() {

  createArray();
  shuffle();
  printArray();

}
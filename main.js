var arr = [
				{
								code: "adpw",
								exp: "7/13/2021"
				},
				{
								code:"modpw",
								exp: "11/23/2023"
				},
				{
								code:"user",
								exp: "11/23/2023"
				}
]

Array.prototype.getIndexOf = function(el) {

  var ar = this;

  for (var i=0; i<ar.length; i++){
     console.log(ar[i].name);
     if(ar[i].name==el){
       return i;
     }
     
  }
  
  return -1;

}

alert(arr.getIndexOf("user"));

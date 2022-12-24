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
	
	function loginFunction () {
 var today= new Date();
 var ok=0;
 var code = document.getElementById("myText1").value;

        for(i = 0; i < arr.length; i++){
            if(code == arr[i].code && today > new Date(arr[i].exp)){
                var ok=1;
            }
        }
        if(ok == 1){
        				swal({title:"မင်္ဂလာပါ", text:"VIPအသုံးပြုသူခင်ဗျာ။", icon:"success"}).then((result) => {
  if (result) {
    window.location = "file:///storage/emulated/0/Download/zapya/misc/index.html"
  }
})
        }
        if(ok == 0){
 												swal({title: "Error", text:"codeမှားယွင်း(သို့မဟုတ်)သက်တမ်းကုန်နေပါသည်", icon: "warning"})
 								}    
}

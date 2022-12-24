var arr = [{username: 'Jon', genrePref: 'rock'},{username: 'Lucy', genrePref: 'pop'},{username: 'Mike', genrePref: 'rock'},{username: 'Luke', genrePref: 'house'},{username: 'James', genrePref: 'house'},{username: 'Dave', genrePref: 'bass'},{username: 'Sarah', genrePref: 'country'},{username: 'Natalie', genrePref: 'bass'}];
	
	var text = "<table border ='1'><tr><th>Username</th><th>genrePref</th></tr>"
	for (var i=0;i<arr.length;i++){
     text+="<tr><td>"+arr[i].username+"</td><td>"+arr[i].genrePref+"</td></tr>"				
	}
	text+="</table>";
    document.write(text);

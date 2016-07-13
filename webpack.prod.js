
var fs = require('fs');

//先清空上线文件夹下的文件
exports.folder = function(path){

    var buildPath= path ;
    var folder_exists = fs.existsSync(buildPath);

    if(folder_exists == true){
        var dirList = fs.readdirSync(buildPath);
        dirList.forEach(function(fileName){
            fs.unlinkSync(buildPath + fileName);
        });

        console.log("clearing  [" + buildPath + "]  folder");

    }else{
        console.log("Folder does not exist or Removal of failure");
    }
}



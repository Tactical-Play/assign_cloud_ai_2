const shell = require('node-powershell');
const ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });
const reader = require('readline');
const readline = reader.createInterface({
    input: process.stdin,
    output: process.stdout
});
var fs = require('fs'),
    http = require('http'),
    https = require('https');
var Stream = require('stream').Transform;

// Download-Image-Helper Function
function downloadImageFromURL(url, filename){
    var client = http;
    if (url.toString().indexOf("https") === 0) {
        client = https;
    }
    client.request(url, function(response) {
        var data = new Stream();
        response.on('data', function(chunk) {
            data.push(chunk);
        });
        response.on('end', function() {
            fs.writeFileSync(filename, data.read());
        });
    }).end();
}

const detect = require('./image_analyse01.js') //helper module
const analyse = require('./image_analyse02.js')//helper module
const path = require('path')

//main (recursive)
async function rec(){
    readline.question(`Enter name for storage account : `, async id => {
            let params = [{name: 'id', value: id}]
             await ps.addCommand("./create_account.ps1",params)
        try{
             await ps.invoke();
        }
        catch(error)// catch error for invalid name or if name is already taken
        {
            console.error("Try again, ",error);
            rec();
        }
        readline.question(`Enter fileurl : `,async urlink => {
            //upload file to blobstorage
            var fp = path.basename(urlink);
            await downloadImageFromURL(urlink,fp);
            let params_2 = [{name: 'fp', value: fp},{name: 'id', value: id},{name:'blob', value:fp},{name:'cont', value:'data'}]
            await ps.addCommand("./upload_blob.ps1",params_2)
            let ps_out= await ps.invoke();
            console.log(ps_out) // display powershell output to console

            // now getting filename of uploaded blob
            let params_3 = [{name: 'id', value: id},{name:'cont', value:'data'}]
            await ps.addCommand("./get_filename.ps1",params_3)
            var fname = await ps.invoke();
            fname= fname.trim();
            var img_list=['.jpeg','.jpg',".png",".svg",".pjp",".pjpeg",".jfif"]// to check if blob file is image or not

            // now checking if file is of image type
            if(img_list.indexOf(path.extname(fname))>=0)
            {
                let params_4 = [{name: 'id', value: id},{name:'blob', value:fname},{name:'cont', value:'data'}]
                await ps.addCommand("./get_bloburl.ps1",params_4)
                let b_url= await ps.invoke();
                console.log(b_url)

                if(await detect.hasAdultCont(b_url)){
                    throw new Error("Image contains Adult Content")
                }

                else{
                    //upload results to storage
                    const tag_info = await analyse.detect_tags(b_url)
                    fs.writeFileSync('tag_info.txt',tag_info);//create text file of results
                    let params_5 = [{name: 'fp', value: 'tag_info.txt'},{name: 'id', value: id},{name:'blob', value:'tag_info.txt'},{name:'cont',value:'results'}]
                    await ps.addCommand("./upload_blob.ps1",params_5)
                    let ps_out= await ps.invoke();
                    console.log(ps_out) // display powershell output to console
                }
            }
            else{
                throw new Error("File unsupported.")// if not image
            }
            });
    });
}
rec();
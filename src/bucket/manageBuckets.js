import { Storage } from 'aws-amplify';
import * as util from 'util' // has no default export

function uploadFileInBucket(name, file) {

    Storage.put( name, file )
    .then (result => {
        console.log('Uploading file: ' + util.inspect(result))
        //return true;
    }) 
    .catch(err => {
        console.log('Error uploading file: ' + err)
        //return false;
    });
    //return true;
}

export { uploadFileInBucket }
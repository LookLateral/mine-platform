import { Storage } from 'aws-amplify';
import * as util from 'util'

function uploadFileInBucket(name, file) {

    Storage.put( name, file )
    .then (result => {
        console.log('Uploading file: ' + util.inspect(result))
    }) 
    .catch(err => {
        console.log('Error uploading file: ' + err)
    });
}

/*function getFileInBucket(name) {

    Storage.get(name)
    .then (result => {
        console.log('Getting file: ' + util.inspect(result))
        return result;
    }) 
    .catch(err => {
        console.log('Error getting file from bucket: ' + err)
        return err;
    });
}*/

function removeFileInBucket(name) {

    Storage.remove(name)
    .then (result => {
        console.log('Removing file: ' + util.inspect(result))
        return result;
    }) 
    .catch(err => {
        console.log('Error removing file from bucket: ' + err)
        return false;
    });
}

export { uploadFileInBucket, /*getFileInBucket,*/ removeFileInBucket }
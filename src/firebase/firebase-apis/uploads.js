import { db, storage } from '..';

const Uploads = {
  getUploads: async (request, callback) => {
    var projectId = request;

    try {
      db.collection('uploads')
        .where('projectId', '==', projectId)
        .onSnapshot(function(uploads) {
          let uploadsArray = [];
          uploads.forEach(upload => {
            uploadsArray = [...uploadsArray, upload.data()];
          });

          callback(uploadsArray);
        });
    } catch (error) {}
  },

  addUploads: async (request, callback) => {
    const { name, description, group, projectId, file } = request;
    db.collection('uploads')
      .add({
        name: name,
        description: description,
        group: group,
        projectId: projectId,
        uploadUrl: ''
      })
      .then(addedUpload => {
        const fileUrl = `uploads/${file.name}`;
        const uploadTask = storage.ref(fileUrl).put(file);
        uploadTask.on(
          'state_changed',
          snapshot => {},
          error => {},
          () => {
            storage
              .ref('uploads/')
              .child(file.name)
              .getDownloadURL()
              .then(uploadUrl => {
                db.collection('uploads')
                  .doc(addedUpload.id)
                  .update({ uploadUrl: uploadUrl });
              });
          }
        );
      });
  }
};

export default Uploads;

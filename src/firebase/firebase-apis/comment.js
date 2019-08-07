import { db } from '../../firebase';

const Comment = {
  getComments: async (request, callback) => {
    var projectId = request;

    try {
      db.collection('comments')
        .where('projectId', '==', projectId)
        .onSnapshot(function(comments) {
          let commentsArray = [];
          comments.forEach(comment => {
            commentsArray = [...commentsArray, comment.data()];
          });

          callback(commentsArray);
        });
    } catch (error) {}
  },

  addComment: async (request, callback) => {
    const { date, name, comment, projectId } = request;
    db.collection('comments').add({
      date: date,
      name: name,
      comment: comment,
      projectId: projectId
    });
  }
};

export default Comment;

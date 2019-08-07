import { db } from '..';

const News = {
  getNews: async (request, callback) => {
    var projectId = request;

    try {
      db.collection('announcement')
        .where('projectId', '==', projectId)
        .onSnapshot(function(announcements) {
          let announcementArray = '';
          announcements.forEach(announcement => {
            announcementArray = announcement.data().value;
          });

          callback(announcementArray);
        });
    } catch (error) {}
  },

  updateNews: async (request, callback) => {
    const value = request;
    db.collection('announcement')
      .doc('yH64QZEtoLhHf4tZh3e3')
      .update({
        value: value
      });
  }
};

export default News;

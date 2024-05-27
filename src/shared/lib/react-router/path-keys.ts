export const pathKeys = {
  root: '/',
  auth: {
    root() {
      return pathKeys.root.concat('auth/');
    },
    login() {
      return pathKeys.auth.root().concat('login/');
    },
    register(nextUrl: string = '') {
      return pathKeys.auth.root().concat(`register/${nextUrl ? `?nextUrl=${nextUrl}` : ''}`);
      ``;
    },
    createProfile() {
      return pathKeys.auth.root().concat('create-profile/');
    },
    editProfile() {
      return pathKeys.auth.root().concat('edit-profile/');
    },
  },
  group: {
    root() {
      return pathKeys.root.concat('group/');
    },
    create() {
      return pathKeys.group.root().concat('create/');
    },
    setting(id: string) {
      return pathKeys.group.root().concat(`setting/${id}/`);
    },
    detail(id: string) {
      return pathKeys.group.root().concat(`${id}/`);
    },
  },
  bookmark: {
    root() {
      return pathKeys.root.concat('bookmark/');
    },
    create() {
      return pathKeys.bookmark.root().concat('create/');
    },
  },
  invitation: {
    root() {
      return pathKeys.root.concat('invitation/');
    },
    link(link: string) {
      return pathKeys.invitation.root().concat(link);
    },
  },
};

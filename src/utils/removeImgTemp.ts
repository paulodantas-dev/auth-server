import fs from 'fs';

export const removeImgTmp = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

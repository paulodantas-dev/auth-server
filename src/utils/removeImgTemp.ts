import fs from 'fs';

export const removeTmp = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

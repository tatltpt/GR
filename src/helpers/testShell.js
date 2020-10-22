const { exec } = require('child_process');

export async function lsWithGrep () {
  try {
      const { stdout, stderr } = await exec('cd ..');
      console.log('stdout:');
      console.log('stderr:');
  }catch (err) {
     console.error(err);
  };
};


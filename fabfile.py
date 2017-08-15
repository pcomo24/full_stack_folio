from fabric.api import run, env, sudo, cd, prefix, shell_env

env.hosts = ['104.238.146.151']
env.user = 'paul'

DIR = '/home/paul/full_stack_folio'
VENV = 'echo Hello'

def start ():
  with cd(DIR):
    with shell_env(PATH='/home/paul/.nvm/versions/node/v6.10.3/bin:$PATH'):
      with prefix(VENV):
        run('pm2 start index.js > start.log')

def stop ():
  run('pm2 stop all > stop.log')

def deploy ():
  with cd(DIR):
    run('git pull')

    with prefix(VENV):
      run('npm install  > install.log')

    run('pm2 restart all > restart.log')

def hello ():
  print("Hello")
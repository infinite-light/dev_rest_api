pipeline{
  agent { docker {image 'python:3.7.2'}}
  stages {
    stage('build') {
      steps {
        withEnv(["HOME=${env.WORKSPACE}"]) {
          sh 'pip install -r requirements.txt --user'
          sh './manage.py test'
         }
      }
    }
 }
         

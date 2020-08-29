APPLICATION_RUNNING_STATUS = false
pipeline {
  agent any
  stages {
    stage('BURN UP') {
      steps {
        script {
          groovy = load "bonaFideUserScript.groovy"
        }
      }
    }

    stage('PROCEED') {
      steps {
        script {
          groovy.getReleaseConfirmation()
        }
      }
    }

    stage('FETCH') {
      steps {
        script {
          groovy.fecthJarAndDockerFile()
        }
      }
    }

    stage('BUILD ROUSTER') {
      steps {
        script {
          groovy.buildDockerImage()
        }
      }
    }

    stage('PUSH ROUSTER') {
      steps {
        script {
          groovy.pushDockerImage()
        }
      }
    }

    stage('HALT KETTLE') {
      steps {
        script {
          groovy.stopRunningContainer()
        }
      }
    }

    stage('ACTUATE KETTLE') {
      steps {
        script {
          groovy.runContainer()
        }
      }
    }

    stage('PROBE KETTLE') {
      steps {
        script {
          groovy.performHealthCheck()
        }
      }
    }

    stage('CLEAN SLATE') {
      steps {
        script {
          groovy.performCleanSlateProtocol()
        }
      }
    }

  }
  post{
        success{
            slackSend channel: '#bona-fide-production-deployment', color: 'good', message: 'Deployment Successfull... Bona Fide User is UP & RUNNING on port 9006 ', teamDomain: 'bona-fide-co', tokenCredentialId: 'slackIntegrationIdForSendingNotification'            
        }
        failure{
            slackSend channel: '#bona-fide-production-deployment', color: 'danger', message: 'Deployment Failed!!! Kindly have a look', teamDomain: 'bona-fide-co', tokenCredentialId: 'slackIntegrationIdForSendingNotification'
        }
    }
 }

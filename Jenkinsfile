APPLICATION_RUNNING_STATUS = false
pipeline {
  agent any
  environment{
    JENKINS_BUILD_URL = "http://13.235.2.41:9010/blue/organizations/jenkins/Bona-Fide-User/detail/Bona-Fide/${env.BUILD_NUMBER}/pipeline/"
  }
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
            slackSend channel: '#bona-fide-production-deployment', color: 'danger', message: "Deployment Failed for Service: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", teamDomain: 'bona-fide-co', tokenCredentialId: 'slackIntegrationIdForSendingNotification'
        }
        aborted{
            slackSend channel: '#bona-fide-production-deployment', color: 'warning', message: "Deployment Aborted for Service: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.JENKINS_BUILD_URL}|Open>)", teamDomain: 'bona-fide-co', tokenCredentialId: 'slackIntegrationIdForSendingNotification'
        }
    }
 }

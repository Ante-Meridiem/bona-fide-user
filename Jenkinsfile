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

    stage('REPORT') {
      when {
        expression {
          APPLICATION_RUNNING_STATUS == true
        }
      }
      steps {
        echo "*****Deployment Successfull***** Application Bona Fide User is up and running in port 9006 with build version ${buildVersion}"
      }
    }

  }
 }

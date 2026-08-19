pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        NODE_VERSION = '20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Branch: ${env.GIT_BRANCH}"
                echo "Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'node --version || true'
                    sh 'npm ci || npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                dir('frontend') {
                    sh 'npm test || true'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                dir('frontend') {
                    archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            echo "Build ${currentBuild.currentResult} - Job: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
        success {
            echo 'ecom-store pipeline succeeded'
        }
        failure {
            echo 'ecom-store pipeline failed'
        }
    }
}

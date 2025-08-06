pipeline {
    agent any

    environment {
        BRANCH_NAME = "${env.BRANCH_NAME}"

        PROD_PRINTER_HOST = credentials('prod-printer-host');
        PROD_PRINTER_PORT = credentials('prod-printer-port');
        PROD_SECRET_KEY = credentials('prod-secret-key');
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub repository
                git branch: 'main', url: 'https://github.com/curtbrink/corkban-printsrv'

                // grab the app name and version from the package.json
                script {
                    def packageJson = readJSON file: 'package.json'
                    def cbpsrvVersion = packageJson.version
                    def cbpsrvName = packageJson.name
                    
                    env.CBPSRV_VERSION = cbpsrvVersion
                    env.CBPSRV_NAME = cbpsrvName
                }
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

//         stage('Test') {
//             steps {
//                 // Run tests if applicable
//                 sh 'npm test'
//             }
//         }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Generate env file') {
            when { branch 'main' }
            steps {
                script {
                    sh 'touch .env'
                    sh 'echo \"PRINTER_HOST=$PROD_PRINTER_HOST\" >> .env'
                    sh 'echo \"PRINTER_PORT=$PROD_PRINTER_PORT\" >> .env'
                    sh 'echo \"SECRET_KEY=$PROD_SECRET_KEY\" >> .env'
                }
            }
        }

        stage('Build Docker image') {
            when { branch 'main' }
            steps {
                script {
                    // Build the Docker image and tag it with the version
                    def imageName = "${env.CBPSRV_NAME}:${env.CBPSRV_VERSION}"
                    sh "docker build -t ${imageName} ."
                }
            }
        }

        stage('Remove existing Docker container') {
            when { branch 'main' }
            steps {
                script {
                    def containerExists = sh(script: "docker ps -a -q -f name=${env.CBPSRV_NAME}", returnStdout: true).trim()
                    if (containerExists) {
                        // Stop and remove container if it's running
                        sh "docker stop ${env.CBPSRV_NAME}"
                        sh "docker rm ${env.CBPSRV_NAME}"
                    } else {
                        echo "Container ${env.CBPSRV_NAME} does not exist, skipping stop/remove."
                    }
                }
            }
        }

        stage('Deploy Docker image') {
            when { branch 'main' }
            steps {
                script {
                    // recreate container with new image
                    sh "docker run -d -p 34200:34200 --name ${env.CBPSRV_NAME} ${env.CBPSRV_NAME}:${env.CBPSRV_VERSION}"
                }
            }
        }
    }
}

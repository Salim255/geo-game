pipeline {

    agent any

    environment {
      FRONTEND_IMAGE = "crawan/geo-game-client"
    }

    stages {

        /***********************************
         * 1. CHECKOUT
         ***********************************/
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        /***********************************
         * 4. BUILD FRONTEND
         ***********************************/
        stage('Build Frontend') {
            steps {
                echo "🚀 Building FRONTEND image..."

                sh """
                    docker build \
                        -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} \
                        -t ${FRONTEND_IMAGE}:latest \
                        .
                """
            }
        }

        /***********************************
         * 5. DOCKER LOGIN
         ***********************************/
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        /***********************************
         * 6. PUSH IMAGES
         ***********************************/
        stage('Push Images') {
            steps {
                script {
                  echo "📤 Pushing FRONTEND..."
                  sh """
                      docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                      docker push ${FRONTEND_IMAGE}:latest
                  """
                }
            }
        }

        /***********************************
         * 7. DEPLOY (PULL ONLY)
         ***********************************/
        stage('Deploy with Docker Compose') {
            steps {
                echo "📦 Deploying with docker-compose..."

                sh """
                    docker-compose pull
                    docker-compose up -d
                """
            }
        }
    }

    /***********************************
     * POST
     ***********************************/
    post {
        always {
            sh "docker system prune -af || true"
        }

        success {
            echo "✅ Deployment successful"
        }

        failure {
            echo "❌ Deployment failed"
        }
    }
}

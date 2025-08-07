pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'karthik3366'
        DOCKER_HUB_PASSWORD = credentials('D3v3l0p3r@115')
        IMAGE_NAME = 'chapter-split'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_USERNAME/chapter-split.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_HUB_USER/$IMAGE_NAME:latest .'
            }
        }

        stage('Docker Login') {
            steps {
                sh "echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USER --password-stdin"
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}

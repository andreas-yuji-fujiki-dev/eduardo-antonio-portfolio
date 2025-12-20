# Docker Guide for Development

- ⬅️ [Return to documentation home](../README.md)

## What is Docker?

Docker is an open-source platform that allows you to create, deploy, and run applications in containers. Containers are isolated environments that package an application with all its dependencies, ensuring that it works consistently in any environment.

### Main Benefits
- **Consistency:** The application runs the same on any machine
- **Isolation:** Each service runs in its own environment
- **Portability:** Easy to move between development, testing, and production
- **Efficiency:** Shares the operating system kernel, using fewer resources than virtual machines

---

## How to Install

### Windows
**Minimum Requirements**

- Windows 10 64-bit (Pro, Enterprise, or Education – version 1607 or higher)
- Windows 11
- Hyper-V enabled
- 4GB of RAM (8GB+ recommended)

**Steps**
1. Download Docker Desktop from the official website
2. Run the installer and follow the wizard
3. Restart your computer when prompted
4. After installation, Docker Desktop will start automatically

---

### Linux (Ubuntu/Debian)

```bash
# 1. Update the packages
sudo apt update

# 2. Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 3. Add the official Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 4. Add the Docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 5. Update and install Docker again
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 6. Add your user to the docker group
sudo usermod -aG docker $USER

# 7. Restart or log out/log in


---

## How to Enable Virtualization

### Windows
**BIOS / UEFI**
1. Restart your computer
2. Enter the BIOS/UEFI (F2, F10, Del or Esc)
3. Enable:

- Intel VT-x or AMD-V 4. Save and restart

**Windows Features**
1. Press `WIN + R`, type `optionalfeatures`
2. Enable:

- Hyper-V

- Windows Hypervisor Platform

- Windows Containers
3. Restart the computer

**Verification**
- Task Manager → Performance → CPU

- Check if **Virtualization** is enabled

---

### Linux
```bash
egrep -c '(vmx|svm)' /proc/cpuinfo

```

If it returns `0`, enable virtualization in the BIOS.

---

## Basic Docker Commands

### First Steps
```bash
docker run hello-world
docker run -it ubuntu bash
docker ps
docker ps -a
docker images
```

### Container Management
```bash
docker start container_name
docker stop container_name
docker restart container_name
docker rm container_name
docker rm -f container_name
docker logs container_name
docker logs -f container_name
docker exec -it container_name bash
```

### Image Management
```bash
docker pull image_name:tag
docker rmi image_name
docker image prune
docker images -a
```

### Cleanup and Maintenance
```bash
docker container prune
docker image prune
docker volume prune
docker system prune
docker system prune -a --volumes
docker system df
```

---

## How to Run This Project

### Project Structure
```text
eduardo-antonio-portfolio/
├── api/
├── frontend/
│ ├── panel/
│ └── portfolio/
└── docker/

└── docker-compose.yml
```

### Commands
```bash
cd docker
docker-compose down
docker-compose build --no-cache
docker-compose up
docker-compose up -d
```

---

## Accessing the Services
- **Backend API:** http://localhost:3001
- **Administrative Panel:** http://localhost:3002
- **Public Website:** http://localhost:3000

---

## Important Tips
- Use **WSL 2** on Windows
- Avoid unnecessary rebuilds
- Adjust resources in Docker Desktop

---

**Developed by Andreas Yuji Fujiki – Software Engineer** _This guide was created to facilitate development with Docker.

- ⬅️ [Return to documentation home](../README.md)
# You can use most Debian-based base images
FROM node:22-slim

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Install dependencies and customize sandbox
WORKDIR /home/user/nextjs-app

RUN npx --yes create-next-app@15.3.4 . --yes

RUN npx --yes shadcn@4.13.0 init \
    --yes \
    --base radix \
    --preset nova \
    --force
RUN npx --yes shadcn@4.13.0 add --all --yes







FROM node


ENV PORT=${PORT}
ENV DB_CONNECTION_STRING=${DB_CONNECTION_STRING}
ENV JWT_TOKEN_SECRET_KEY=${JWT_TOKEN_SECRET_KEY}
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_KEY=${SUPABASE_KEY}

WORKDIR /usr/src/app


RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev


COPY . .


EXPOSE 3000

CMD npm run main

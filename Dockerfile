# Указываем операционную систему либо другой образ
FROM mcr.microsoft.com/playwright:v1.50.1-noble
# Копируем папку с автотестами в наш будущий образ
COPY . .
# Установить пакеты NPM
RUN npm i
# Установить браузеры и засисимости
RUN npx playwright install --with-deps 
#  Команда для запуска автотестов
CMD [ "npm","run", "test" ]
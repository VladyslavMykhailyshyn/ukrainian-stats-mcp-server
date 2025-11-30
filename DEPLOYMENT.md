# Deployment Guide / Посібник з Розгортання

> **English** | [Українська](#ukrainian-version)

## English Version

### Quick Start for Users

If someone has already published this MCP server to GitHub or npm, you can install it quickly:

#### From GitHub
```bash
npm install -g git+https://github.com/USERNAME/ukrainian-stats-mcp-server.git
```

#### From npm (if published)
```bash
npm install -g ukrainian-stats-mcp-server
```

Then add to your Claude Desktop config:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ukrainian-stats": {
      "command": "ukrainian-stats-mcp"
    }
  }
}
```

Restart Claude Desktop and you're ready!

---

### Publishing Your Own Instance

#### Prerequisites
- Node.js 18 or higher
- Git installed
- GitHub account
- (Optional) npm account for npm registry

#### Step 1: Prepare Your Repository

1. **Navigate to your project**:
```bash
cd f:/ChargeAfter/stat-mcp
```

2. **Initialize Git** (if not already done):
```bash
git init
```

3. **Create .gitignore** (already created, verify it includes):
```
node_modules/
build/
*.log
.env
```

#### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ukrainian-stats-mcp-server`
3. Description: "MCP server for Ukrainian statistical data"
4. Choose Public (recommended) or Private
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

#### Step 3: Update Package.json

Edit `package.json` and replace `YOUR_USERNAME` with your actual GitHub username:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_ACTUAL_USERNAME/ukrainian-stats-mcp-server.git"
  }
}
```

#### Step 4: Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Ukrainian Statistics MCP Server"

# Create main branch
git branch -M main

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git

# Push to GitHub
git push -u origin main
```

#### Step 5: Share Your MCP Server

Now users can install your MCP server with:

```bash
npm install -g git+https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git
```

#### Step 6: (Optional) Publish to npm

To make installation even easier via `npm install -g ukrainian-stats-mcp-server`:

1. **Create npm account**: https://www.npmjs.com/signup

2. **Login to npm**:
```bash
npm login
```

3. **Ensure unique package name**: Check that `ukrainian-stats-mcp-server` is available on npm. If not, update the `name` field in `package.json`.

4. **Publish**:
```bash
npm publish
```

5. **Users can now install via**:
```bash
npm install -g ukrainian-stats-mcp-server
```

---

### Updating Your Package

When you make changes:

#### Update on GitHub
```bash
git add .
git commit -m "Description of changes"
git push
```

Users will need to reinstall:
```bash
npm install -g git+https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git
```

#### Update on npm

1. **Update version** in `package.json`:
```json
{
  "version": "1.0.1"  // Increment version
}
```

2. **Commit and push to GitHub**:
```bash
git add package.json
git commit -m "Bump version to 1.0.1"
git push
```

3. **Publish to npm**:
```bash
npm publish
```

---

### Verification

After installation, verify it works:

1. **Check installation**:
```bash
which ukrainian-stats-mcp  # On macOS/Linux
where ukrainian-stats-mcp  # On Windows
```

2. **Update Claude Desktop config** as shown above

3. **Restart Claude Desktop**

4. **Test with a query**:
```
List all available Ukrainian statistical dataflows
```

---

## Ukrainian Version

### Швидкий Старт для Користувачів

Якщо хтось уже опублікував цей MCP сервер на GitHub або npm, ви можете швидко встановити його:

#### З GitHub
```bash
npm install -g git+https://github.com/USERNAME/ukrainian-stats-mcp-server.git
```

#### З npm (якщо опубліковано)
```bash
npm install -g ukrainian-stats-mcp-server
```

Потім додайте до конфігурації Claude Desktop:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ukrainian-stats": {
      "command": "ukrainian-stats-mcp"
    }
  }
}
```

Перезапустіть Claude Desktop і готово!

---

### Публікація Власного Екземпляра

#### Передумови
- Node.js 18 або вище
- Встановлений Git
- Обліковий запис GitHub
- (Опціонально) Обліковий запис npm для реєстру npm

#### Крок 1: Підготуйте Ваш Репозиторій

1. **Перейдіть до вашого проекту**:
```bash
cd f:/ChargeAfter/stat-mcp
```

2. **Ініціалізуйте Git** (якщо ще не зроблено):
```bash
git init
```

3. **Створіть .gitignore** (вже створено, перевірте, що включає):
```
node_modules/
build/
*.log
.env
```

#### Крок 2: Створіть Репозиторій GitHub

1. Перейдіть на https://github.com/new
2. Назва репозиторію: `ukrainian-stats-mcp-server`
3. Опис: "MCP сервер для української статистичної інформації"
4. Виберіть Public (рекомендовано) або Private
5. **Не** ініціалізуйте з README (у нас вже є)
6. Натисніть "Create repository"

#### Крок 3: Оновіть Package.json

Відредагуйте `package.json` і замініть `YOUR_USERNAME` на ваше справжнє ім'я користувача GitHub:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_ACTUAL_USERNAME/ukrainian-stats-mcp-server.git"
  }
}
```

#### Крок 4: Завантажте на GitHub

```bash
# Додайте всі файли
git add .

# Зробіть коміт
git commit -m "Початковий коміт: MCP Сервер Статистики України"

# Створіть гілку main
git branch -M main

# Додайте віддалений репозиторій (замініть YOUR_USERNAME на ваше ім'я користувача GitHub)
git remote add origin https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git

# Завантажте на GitHub
git push -u origin main
```

#### Крок 5: Поділіться Вашим MCP Сервером

Тепер користувачі можуть встановити ваш MCP сервер:

```bash
npm install -g git+https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git
```

#### Крок 6: (Опціонально) Опублікуйте на npm

Щоб зробити встановлення ще простішим через `npm install -g ukrainian-stats-mcp-server`:

1. **Створіть обліковий запис npm**: https://www.npmjs.com/signup

2. **Увійдіть в npm**:
```bash
npm login
```

3. **Переконайтеся в унікальності назви пакета**: Перевірте, що `ukrainian-stats-mcp-server` доступний на npm. Якщо ні, оновіть поле `name` в `package.json`.

4. **Опублікуйте**:
```bash
npm publish
```

5. **Користувачі тепер можуть встановити через**:
```bash
npm install -g ukrainian-stats-mcp-server
```

---

### Оновлення Вашого Пакета

Коли ви вносите зміни:

#### Оновлення на GitHub
```bash
git add .
git commit -m "Опис змін"
git push
```

Користувачам потрібно буде перевстановити:
```bash
npm install -g git+https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git
```

#### Оновлення на npm

1. **Оновіть версію** в `package.json`:
```json
{
  "version": "1.0.1"  // Збільште версію
}
```

2. **Зробіть коміт і завантажте на GitHub**:
```bash
git add package.json
git commit -m "Оновлення версії до 1.0.1"
git push
```

3. **Опублікуйте на npm**:
```bash
npm publish
```

---

### Перевірка

Після встановлення перевірте, що все працює:

1. **Перевірте встановлення**:
```bash
which ukrainian-stats-mcp  # На macOS/Linux
where ukrainian-stats-mcp  # На Windows
```

2. **Оновіть конфігурацію Claude Desktop** як показано вище

3. **Перезапустіть Claude Desktop**

4. **Протестуйте запитом**:
```
Покажи всі доступні потоки даних української статистики
```

---

## Common Issues / Поширені Проблеми

### Command not found after installation

**Solution**: Ensure npm global bin directory is in your PATH:
```bash
npm config get prefix
```

**Рішення**: Переконайтеся, що глобальна директорія npm bin знаходиться в вашому PATH.

### Permission errors on Linux/macOS

**Solution**: Use `sudo` or configure npm to use a different directory:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
```

**Рішення**: Використовуйте `sudo` або налаштуйте npm на використання іншої директорії.

### Claude Desktop doesn't see the server

1. Check config file syntax (valid JSON)
2. Restart Claude Desktop completely
3. Check Claude Desktop logs for errors

1. Перевірте синтаксис файлу конфігурації (валідний JSON)
2. Повністю перезапустіть Claude Desktop
3. Перевірте журнали Claude Desktop на наявність помилок

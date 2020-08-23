// PROJECT RUNNING GUIDE //

A. INSTALL NODE MODULES

1. Run NPM Install from Root Folder  ---- server-side
2. Move inside Client folder with cd client and Run NPM Install ---- client-side


B. CREATE 

1. Create .env file in the root folder i.e. Config.env ---- Paste Below Code

  1. NODE_ENV=development
  2. PORT=8000
  3. DATABASE=<YOUR_MONGO_URL_PASTE_HERE>  ----- Don't wrap with '';

  4. DATABASE_PASSWORD=<YOUR_MONGO_DB_PASSWORD> ----- Don't wrap with '';

  5. JWT_SECRET=<ANY_JWT_SECRET> ---- Anything String etc --- i.e. i_am_ultra_long_password 
  6. JWT_EXPIRES_IN=9d
  7. JWT_COOKIE_EXPIRES_IN=90


C. CHANGE RUNTIME

1. Move to Client folder and check websocket point, Make Sure it corresponds to below URI
2. uri : 'ws://localhost:8000/graphql 
Note. (If your backend is on port 5000 change above 8000 post to 5000 and so on. By defualt the Port is set to 8000.)



D. RUN APPLICATION

1. npm run dev -----  Will Run Application



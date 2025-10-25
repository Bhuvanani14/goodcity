#!/bin/bash

echo "Starting Good City Application..."
echo ""
echo "Make sure MongoDB is running on localhost:27017"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting the server..."
echo ""
echo "Application will be available at: http://localhost:3000"
echo ""
echo "Demo Credentials:"
echo "  User: user / user@123"
echo "  Admin: admin / admin@123"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start

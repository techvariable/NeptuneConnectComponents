echo 'Building Project'
cd /home/durga/Projects/TechV/Frontend/Project-Neptune
npm run distBuild

echo 'Deleting old files'
rm -r /home/durga/Projects/TechV/Backend/NeptuneConnect/view/components/build*

echo 'Moving files'
cp -r /home/durga/Projects/TechV/Frontend/Project-Neptune/www/build* /home/durga/Projects/TechV/Backend/NeptuneConnect/view/components/build

echo 'Building Project'
cd /home/durga/Projects/TechV/NeptuneConnect/FrontEnd/improvedEditor/Project-Neptune
npm run distBuild

echo 'Deleting old files'
rm -r /home/durga/Projects/TechV/NeptuneConnect/BackEnd/rba/NeptuneConnect/view/components/build/*

echo 'Moving files'
cp -r /home/durga/Projects/TechV/NeptuneConnect/FrontEnd/improvedEditor/Project-Neptune/www/build/* /home/durga/Projects/TechV/NeptuneConnect/BackEnd/rba/NeptuneConnect/view/components/build/

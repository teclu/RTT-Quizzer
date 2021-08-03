yarn build
cd build
touch .nojekyll
git init
git add -A
git commit -m 'chore: deploy'
git push -f git@github.com:teclu/RTT-Quizzer.git master:gh-pages
cd ..
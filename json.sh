FILE=$(ls ./data -tp | grep -v /$ | head -1)
echo $FILE
csv2json  ./data/"$FILE" ./src/bibliography.json -d -s ";"
echo 'Done!'

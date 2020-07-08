#!/bin/sh

read -p "Enter the path of the input file: " INPUT_PATH
read -p "What do you want to name your output file: " OUTPUT_NAME
read -p "What framework do you want to generate? (leave blank to default to React): " FRAMEWORK_TYPE

if [ "$FRAMEWORK_TYPE" = "" ];
then
    node bin/cli.js -i ${INPUT_PATH} -o ${OUTPUT_NAME}
else
    node bin/cli.js -i ${INPUT_PATH} -o ${OUTPUT_NAME} -f ${FRAMEWORK_TYPE}
fi
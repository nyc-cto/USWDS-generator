#!/bin/sh

ARG_ONE=${1:-}
STRING_ONE=${2:-}
ARG_TWO=${3:-}
STRING_TWO=${4:-}
ARG_THREE=${5:-}
STRING_THREE=${6:-}
ARG_FOUR=${7:-}


node bin/cli.js ${ARG_ONE} ${STRING_ONE} ${ARG_TWO} ${STRING_TWO} ${ARG_THREE} ${STRING_THREE} ${ARG_FOUR}

#everything below was me making this more compicated than it actually was

#if [ "$F_ARG" = "" ]
#read -p "Enter the path of the input file: " INPUT_PATH
# read -p "What do you want to name your output file: " OUTPUT_NAME
# read -p "What framework do you want to generate? (leave blank to default to React): " FRAMEWORK_TYPE

# if [ "$FRAMEWORK_TYPE" = "" ];
# then
#     node bin/cli.js -i ${INPUT_PATH} -o ${OUTPUT_NAME}
# else
#     node bin/cli.js -i ${INPUT_PATH} -o ${OUTPUT_NAME} -f ${FRAMEWORK_TYPE}
# fi
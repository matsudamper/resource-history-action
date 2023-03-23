#!/bin/bash

kill $memory_pid
kill $cpu_pid

echo "<table><tr>" >> $GITHUB_STEP_SUMMARY
echo "<td>CPU</td>" >> $GITHUB_STEP_SUMMARY
while IFS= read -r line; do
    echo "$line"
done < "$CPU_FILE"
echo "</tr></table>" >> $GITHUB_STEP_SUMMARY

echo "<table><tr>" >> $GITHUB_STEP_SUMMARY
echo "<td>Memory</td>" >> $GITHUB_STEP_SUMMARY
while IFS= read -r line; do
    echo "<td>$line</td>" >> $GITHUB_STEP_SUMMARY
done < "$MEMORY_FILE"
echo "</tr></table>" >> $GITHUB_STEP_SUMMARY    
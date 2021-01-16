while true; do 
  # get line count from `lsof`
  X=$(lsof -i :$1 | wc -l | tr -dc '0-9')

  # subtract 1 because that includes the header row
  count=$(echo "$((($X-2) / 2))")

  echo $(date +"%T") \| $count
  sleep 0.25
done
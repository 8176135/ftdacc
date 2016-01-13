
onmessage = function(e) {
  loaderFromCd(parseFloat(e.data[0]), parseFloat(e.data[1]));
};

function loaderFromCd(cooldownTime, V)
{
  //postMessage([cooldownTime, V]);
  var answer = [];
  for (var i = 1; i <= 4; i++)
  {
    var numOfAL = 1;
    var closest = Number.POSITIVE_INFINITY;
    while (true)
    {
      var time = 50 * (Math.pow(numOfAL, 0.25) / Math.sqrt(i)) * Math.sqrt(V);
      var dif = cooldownTime - (time / numOfAL);
      if (Math.abs(dif) < closest)
      {
        closest = Math.abs(dif);
      }
      else
      {
        if (dif < 0)
        {
          answer.push(numOfAL);
          break;
        }
        else
        {
          answer.push(numOfAL - 1);
          break;
        }
      }
      numOfAL += 1;
    }
  }
  postMessage(answer);
  // return answer;
}

var barrelCooldownInput = document.getElementsByName("reloadTime")[0];
var barrelCountInput = document.getElementsByName("barrelCount")[0];
var shellDiameterInput = document.getElementsByName("shellDia")[0];
var nModInput = document.getElementsByName("nMod")[0];

var answerDataBox = document.getElementsByClassName("dataBox");

// function loaderFromCd(cooldownTime, V)
// {
//   var answer = [];
//   for (var i = 1; i <= 4; i++)
//   {
//     var numOfAL = 1;
//     var closest = Number.POSITIVE_INFINITY;
//     while (true)
//     {
//       var time = 50 * (Math.pow(numOfAL, 0.25) / Math.sqrt(i)) * Math.sqrt(V);
//       var dif = cooldownTime - (time / numOfAL);
//       console.log(dif);
//       if (Math.abs(dif) < closest)
//       {
//         closest = Math.abs(dif);
//       }
//       else
//       {
//         if (dif < 0)
//         {
//           answer.push(numOfAL);
//           break;
//         }
//         else
//         {
//           answer.push(numOfAL - 1);
//           break;
//         }
//       }
//       numOfAL += 1;
//     }
//   }
//   return answer;
// }
var w;

function calculate()
{
  if (answerShown === false)
  {
    if (!isNaN(+barrelCooldownInput.value) && !isNaN(+shellDiameterInput.value) && !isNaN(+nModInput.value))
    {
      if (IsEmptyOrSpaces(barrelCooldownInput.value) && IsEmptyOrSpaces(shellDiameterInput.value))
      {
        console.log("Please enter a number");
      }
      else
      {
        var volume = Math.pow(parseFloat(shellDiameterInput.value) / 1000, 3) * parseFloat(nModInput.value) * (0.25) * Math.PI;

        //var cannon = new AdvCannon(barrelCooldownInput.value, volume);
        var newAnswer;
        if (typeof(Worker) !== "undefined")
        {
          if (typeof(w) === "undefined")
          {
            showLoading();
            w = new Worker("js/loaderFromCooldown.js");

            w.onmessage = function(event)
            {
              for (var i = 0; i < event.data.length; i++)
              {
                answerDataBox[i].innerHTML = event.data[i];
              }
              w.terminate();
              w = undefined;
              toggleAnswer();
            };
            w.postMessage([(parseFloat(barrelCooldownInput.value) / parseFloat(barrelCountInput.value)) , volume]);
          }
        }
        else
        {
          newAnswer = loaderFromCd(parseFloat(barrelCooldownInput.value), volume);
          for (var i = 0; i < newAnswer.length; i++)
          {
            answerDataBox[i].innerHTML = newAnswer[i];
          }
        }

        //document.getElementById("results").innerHTML = ("<pre>" + cannon.GetAutoloaders() + "</pre>");
      }
    }
    else
    {
      console.log("Not a valid number!");
    }
  }else {
    toggleAnswer();
  }
}

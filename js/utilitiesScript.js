var fireRateDef = "Fire Rate (RPM)";
var reloadTimeDef = "Reload Time";

function IsEmptyOrSpaces(str)
{
  return str === null || str.match(/^ *$/) !== null;
}

function Clear(caller)
{
  if (caller.value == fireRateDef || caller.value == reloadTimeDef)
  {
    caller.value = "";
  }
  //caller.color = "rgb(25, 25, 25)";
}

function BackToOrigin(caller)
{
  if (IsEmptyOrSpaces(caller.value))
  {
    if (caller.name == "reloadTime")
    {
      caller.value = reloadTimeDef;
    }
    else if (caller.name == "fireRate")
    {
      caller.value = fireRateDef;
    }
  }
  //caller.color = "rgb(140, 140, 140)";
}

function validate(e, caller)
{
  if (e.charCode !== 0)
  {
    var entered = String.fromCharCode(e.charCode);
    if (isNaN(+entered) && (entered != "." || (caller.value.split(".").length - 1) > 0))
    {
      e.preventDefault();
    }
  }
}
String.prototype.splice = function(idx, rem, str)
{
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function shellDiaVal(e, caller)
{
  if (parseFloat(caller.value) > 500)
  {
    caller.value = 500;
  }
  else if (parseFloat(caller.value) <= 0)
  {
    caller.value = 1;
  }
}

function modulesVal(e, caller)
{
  if (parseFloat(caller.value) > 800)
  {
    caller.value = 800;
  }
  else if (parseFloat(caller.value) <= 1)
  {
    caller.value = 1;
  }
}

function barrelVal(e, caller)
{
  if (caller.value.length > 0)
  {
    if (parseFloat(caller.value) > 6)
    {
      caller.value = 6;
    }
    else if (parseFloat(caller.value) < 1)
    {
      caller.value = 1;
    }
  }
  else
  {
    caller.value = 1;
  }

}

$(document).ready(function()
{
  $('input, textarea').placeholder();
});

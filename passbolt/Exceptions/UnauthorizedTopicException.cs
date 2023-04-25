using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace passbolt.Exceptions
{
    public class UnauthorizedTopicException : Exception
    {
        public UnauthorizedTopicException(string topicName) : base($"Unauthorized topic attempted: {topicName}"){}
    }
}

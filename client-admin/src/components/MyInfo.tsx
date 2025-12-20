const MyInfo = () => {
  return (
    <div className='mb-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
      {/* Left */}
      <div className='flex flex-col gap-1'>
        <div className='text-base font-semibold text-gray-900 tracking-tight'>
          Akshit Yadav Aesham
        </div>

        <div className='text-sm text-gray-600'>
          +91 9704590423
          <span className='mx-2 text-gray-400'>•</span>
          <a
            href='http://104.248.75.249/demo/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium text-gray-700 hover:text-gray-900 underline underline-offset-4'
          >
            http://104.248.75.249/demo
          </a>
        </div>
      </div>

      {/* Right */}
      <div className='flex items-center gap-3 text-sm'>
        <a
          href='https://github.com/Akshityadav370'
          target='_blank'
          rel='noopener noreferrer'
          className='rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:border-gray-400 hover:bg-white hover:text-gray-900 transition'
        >
          GitHub
        </a>

        <a
          href='https://www.linkedin.com/in/akshit-yadav/'
          target='_blank'
          rel='noopener noreferrer'
          className='rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:border-gray-400 hover:bg-white hover:text-gray-900 transition'
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default MyInfo;

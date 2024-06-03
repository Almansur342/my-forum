import { FaSearch } from 'react-icons/fa';
import banner from '../../assets/logo/forum-banner.png'
const Banner = () => {
  return (
    <div className="bg-[#FFF8F5] pb-10 pt-5">
      <section className="container mx-auto px-4">
	<div className="container flex flex-col justify-center items-center mx-auto sm:py-12 lg:py-1 lg:flex-row lg:justify-between">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-lg xl:max-w-lg lg:text-left">
			<h1 className="text-5xl text-[#111430] font-bold leading-none sm:text-5xl">Engage, Share,<br />
      Connect on <span className='text-[#F73E7B]'>DOCY</span>
			</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12 max-w-sm ">Join Forum, a vibrant online platform for discussions, where you can engage, share ideas, and connect with others through posted messages.
			</p>
			<fieldset className="w-full space-y-1">
	<label htmlFor="Search" className="hidden">Search</label>
	<div className="relative">
		<span className="absolute inset-y-0 left-0 flex items-center pl-2">
			<button type="button" title="search" className="p-1 focus:outline-none focus:ring">
				<FaSearch></FaSearch>
			</button>
		</span>
		<input type="search" name="Search" placeholder="Search..." className="w-40 border border-[#F73E7B] py-2 pl-10 text-base rounded-md sm:w-auto" />
	</div>
</fieldset>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src={banner} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
</section>
    </div>
  );
};

export default Banner;